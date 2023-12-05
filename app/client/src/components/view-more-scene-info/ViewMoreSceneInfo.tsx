import classNames from "classnames";
import { SceneType } from "../../types/SceneType";

function ViewMoreSceneInfo({ isMoreSceneInfoToggled, sceneInfo, setSceneInfo }: { isMoreSceneInfoToggled: boolean; sceneInfo: SceneType; setSceneInfo: (updateField) => updateField }) {
	return (
		<form className={classNames(`px-6 py-4 bg-neutral-800 w-full h-fit text-white flex flex-col gap-6 duration-300`, isMoreSceneInfoToggled ? "-translate-y-[400px]" : "translate-y-0")}>
			<div className="flex flex-col gap-2 ">
				{/* Scene name input container*/}
				<div className="mt-4 w-full">
					<label htmlFor="name" className="font-bold text-accent">
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
						className="w-full focus:outline-none bg-transparent"
					/>
				</div>
				{/* Weather conditions input container */}
				<div className="mt-4 w-full">
					<label htmlFor="weatherConditions" className="font-bold text-accent">
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
						className="w-full focus:outline-none bg-transparent"
					/>
				</div>
			</div>
			{/* Calender Scenes dates container */}
			<div className="mt-4 flex flex-col md:flex-row gap-4 md:items-center">
				{/* calender start date input */}
				<label htmlFor="calenderStartDate" className="font-bold text-accent">
					Calender start time:
				</label>
				<input type="datetime-local" name="calenderStartDate" id="calenderStartDate" className="text-black" />
				{/* calender start date input */}
				<label htmlFor="calenderStartDate" className="font-bold text-accent">
					Calender start time:
				</label>
				<input type="datetime-local" name="calenderStartDate" id="calenderStartDate" className="text-black" />
			</div>
			{/* Description container */}
			<div aria-label={`description section for ${sceneInfo.name} scene`} className="mt-6">
				<label htmlFor="description" className="font-bold text-accent">
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
					className="w-full h-20 bg-transparent border border-neutral-600 rounded-sm focus:outline-none resize-none"></textarea>
			</div>
			{/* Call time input / Call sheet input */}
			<div className="flex flex-1 flex-col md:flex-row md:items-center gap-2">
				{/* CallTime input */}
				<label htmlFor="CallTime" className="font-bold text-accent">
					CallTime:
				</label>
				<input type="datetime-local" id="CallTime" name="CallTime" className="text-black" />
				{/* Call Sheet input */}
				<div className="mt-4 md:mt-0 flex flex-1 gap-2 w-full items-center">
					<label htmlFor="callSheet" className="font-bold text-accent">
						Call Sheet:
					</label>
					<input onChange={e => setSceneInfo({ ...sceneInfo, callSheet: e.target.value })} value={sceneInfo.callSheet} placeholder="Add a Call sheet" type="text" id="callSheet" name="callSheet" className=" focus:outline-none bg-transparent" />
				</div>
			</div>
			<button className="mt-4 py-2 px-6 flex justify-center w-full sm:w-fit font-bold bg-primary hover:bg-accent hover:text-black duration-300 rounded-md">Update Scene Info</button>
		</form>
	);
}

export default ViewMoreSceneInfo;
