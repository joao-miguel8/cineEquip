import classNames from "classnames";
import { SceneType } from "../../types/SceneType";
import { editSceneInfo } from "../../lib/api/services/scene-services/editSceneInfo";
import { formatToDateTimeLocalString } from "../../util/formatToDateTimeLocalString";
import { FaChevronUp } from "react-icons/fa";

function ViewMoreSceneInfo({ isMoreSceneInfoToggled, setIsMoreSceneInfoToggled, sceneInfo, setSceneInfo }: { isMoreSceneInfoToggled: boolean; sceneInfo: SceneType; setSceneInfo: (updateField) => updateField }) {
	// bg - [#FFFFFF];
	return (
		<div className="mx-4 md:mx-0 md:w-fit flex flex-col items-end shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-[#FFFFFF]">
			<button onClick={() => setIsMoreSceneInfoToggled(prevVal => !prevVal)} className="pl-4 p-2 flex h-14 text-12 sm:text-14 text-left font-bold md:w-[24rem] w-full justify-between items-center bg-primary text-white rounded-sm">
				View More info about {sceneInfo.name}
				<FaChevronUp size={"1.4rem"} color={"#fff"} className={classNames(`mr-4 duration-300`, isMoreSceneInfoToggled ? "rotate-180" : "rotate-0")} />
			</button>
			<div className={classNames(`md:w-[24rem] w-full overflow-hidden`, isMoreSceneInfoToggled ? "h-0" : "h-fit")}>
				<form
					onSubmit={async e => {
						e.preventDefault();
						try {
							await editSceneInfo(sceneInfo._id, sceneInfo);
							setSceneInfo(sceneInfo);
						} catch (err) {
							console.log("Error updating scene info", err);
						}
					}}
					className={classNames(`px-6 py-4 bg-[#FFFFFF] w-full  h-fit text-white flex flex-col gap-6 duration-300`, isMoreSceneInfoToggled ? "-translate-y-[400px]" : "translate-y-0")}>
					<div className="flex flex-col min-[450px]:flex-row gap-2 ">
						{/* Scene name input container*/}
						<div className="mt-4 w-full">
							<label htmlFor="name" className="text-14 font-bold text-primary">
								SceneName:
							</label>
							<input
								onChange={e => {
									setSceneInfo({ ...sceneInfo, name: e.target.value });
								}}
								value={sceneInfo.name}
								id="name"
								name="name"
								placeholder="Add a scene name"
								maxLength={24}
								className="w-full focus:outline-none bg-transparent text-black"
							/>
						</div>
						{/* Weather conditions input container */}
						<div className="mt-4 w-full">
							<label htmlFor="weatherConditions" className="text-14 font-bold text-primary">
								Weather Conditions:
							</label>
							<input
								onChange={e => {
									setSceneInfo({ ...sceneInfo, weatherConditions: e.target.value });
								}}
								value={sceneInfo.weatherConditions}
								maxLength={20}
								placeholder="Add a weather condition"
								id="weatherConditions"
								name="weatherConditions"
								className="w-full focus:outline-none bg-transparent text-black"
							/>
						</div>
					</div>
					{/* Description container */}
					<div aria-label={`description section for ${sceneInfo.name} scene`}>
						<label htmlFor="description" className="text-14 font-bold text-primary">
							Description:
						</label>
						<textarea
							onChange={e => setSceneInfo({ ...sceneInfo, description: e.target.value })}
							value={sceneInfo.description}
							name="description"
							id="description"
							cols={30}
							rows={10}
							maxLength={700}
							className="px-2 w-full h-20 bg-transparent border border-gray-300 rounded-sm focus:outline-none resize-none text-black focus:border-primary"></textarea>
					</div>
					{/* Calender Scenes dates container */}
					<div className="mt-4 flex flex-col gap-4 md:items-center">
						<div className="flex flex-col sm:flex-row md:items-center gap-2">
							{/* calender start date input */}
							<label htmlFor="calenderStartDate" className=" text-14 font-bold text-primary">
								Calender start time:
							</label>
							<input
								onChange={e => setSceneInfo({ ...sceneInfo, calenderStartDate: e.target.value })}
								value={sceneInfo.calenderStartDate ? formatToDateTimeLocalString(sceneInfo.calenderStartDate) : ""}
								type="datetime-local"
								name="calenderStartDate"
								id="calenderStartDate"
								className="w-fit text-black"
							/>
						</div>
						{/* calender end date input */}
						<div className="flex flex-col sm:flex-row md:items-center gap-2">
							<label htmlFor="calenderEndDate" className="text-14 font-bold text-primary">
								Calender end time:
							</label>
							<input
								onChange={e => setSceneInfo({ ...sceneInfo, calenderEndDate: e.target.value })}
								value={sceneInfo.calenderEndDate ? formatToDateTimeLocalString(sceneInfo.calenderEndDate) : ""}
								type="datetime-local"
								name="calenderEndDate"
								id="calenderEndDate"
								className="w-fit text-black"
							/>
						</div>
					</div>

					{/* Call time input / Call sheet input */}
					<div className="flex flex-col item-start gap-4">
						{/* CallTime input */}
						<div>
							<label htmlFor="CallTime" className="text-14 font-bold text-primary">
								CallTime:
							</label>
							<input onChange={e => setSceneInfo({ ...sceneInfo, callTime: e.target.value })} value={sceneInfo.callTime ? formatToDateTimeLocalString(sceneInfo.callTime) : ""} type="datetime-local" id="CallTime" name="CallTime" className="text-black" />
							{/* Call Sheet input */}
						</div>
						<div className="mt-4 md:mt-0 flex flex-1 gap-2 w-full items-center">
							<label htmlFor="callSheet" className="flex-2 text-14 font-bold text-primary">
								Call Sheet:
							</label>
							<input onChange={e => setSceneInfo({ ...sceneInfo, callSheet: e.target.value })} value={sceneInfo.callSheet} placeholder="Add a Call sheet" type="text" id="callSheet" name="callSheet" className="flex-1 w-full focus:outline-none bg-transparent text-black" maxLength={10} />
						</div>
					</div>
					<button type="submit" className="mt-4 py-2 px-6 flex justify-center w-full sm:w-fit text-14 font-bold bg-primary hover:bg-accent hover:text-black duration-300 rounded-md">
						Update Scene Info
					</button>
				</form>
			</div>
		</div>
	);
}

export default ViewMoreSceneInfo;
