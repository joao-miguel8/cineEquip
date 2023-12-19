import { useState } from "react";

// HOOK SUMMARY:
// Description:
/*
This hook is designed to simplify the management of selected items within an array in components. It provides a clean and reusable solution for tracking and updating the selected item index, making it easier to implement selection functionality in a component

- The hook makes use of these functionalities:
selectedItemIndex:
- Access the index of the currently selected item in the array.

deselectItem():
- Call this function to deselect the currently selected item.

selectItem(index: number):
- Call this function with the index of the item you want to select.

*/
// Example of usage with a radio input:
/*
- You have a list of radio buttons where you want only one to be selected at a time.

<div className="radio-button-list">
      {options.map((option, index) => (
        <label key={option.value}>
          <input
            type="radio"
            checked={index === selectedItemIndex}
            onChange={() => selectItem(index)}
          />
          {option.label}
        </label>
      ))}
    </div> */
// --- 2nd Example using an array ---
/*

  const fruits = ["Apple", "Banana", "Orange", "Grapefruit"];
  const { selectedItemIndex, deselectItem, selectItem } = useSelectArrayItem();

  return (
    <>
      <ul>
        {fruits.map((fruit, index) => (
          <li
            key={fruit}
            className={index === selectedItemIndex ? "selected" : ""}
            onClick={() => selectItem(index)}
          >
            {fruit}
          </li>
        ))}
      </ul>
      {selectedItemIndex !== -1 && (
        <div>
          <h3>Selected Fruit:</h3>
          <p>{fruits[selectedItemIndex]}</p>
        </div>
      )}
    </>
*/

// =======================
// =======================

export const useSelectArrayItem = () => {
	// state to check an arrays index, use case for selecting the correct value to select with select
	const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

	// update selectedItemIndex to -1 to trigger a deselect
	const deselectItem = () => {
		setSelectedItemIndex(-1);
	};

	// update selectItem to pass a specific index of an array to select
	const selectItem = (index: number) => {
		setSelectedItemIndex(index);
	};

	return { selectedItemIndex, deselectItem, selectItem };
};
