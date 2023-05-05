import classNames from "classnames";
import { useCombobox } from "downshift";
import { forwardRef, useEffect, useState } from "react";
import type { IconButtonProps } from "./IconButton";
import IconButton from "./IconButton";
import FormLabel from "./FormLabel";

export type SelectOption = {
  name: string;
  value: string;
};

type SelectProps = {
  autoFocus?: boolean;
  id: string;
  label?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  value: string | null;
};

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    { autoFocus, id, label, options, onChange, placeholder, value, ...rest },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState("");

    const selectedOption = options.find((option) => option.value === value);
    const hasSelectedOption = !!selectedOption;

    const filteredOptions = getFilteredOptions();

    const {
      isOpen,
      getInputProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      getItemProps,
      highlightedIndex,
      selectItem,
    } = useCombobox<SelectOption>({
      id,
      items: filteredOptions,
      itemToString: (item) => item?.name || "",
      onInputValueChange: ({ inputValue }) => {
        setSearchTerm(inputValue || "");
      },
      onSelectedItemChange: ({ selectedItem: newItem }) => {
        onChange(newItem?.value || "");
      },
      selectedItem: selectedOption || null, // Null is necessary to avoid it being used as uncontrolled input
    });

    useEffect(() => {
      const searchedOption = options.find(({ name }) => name === searchTerm);

      if (hasSelectedOption && !searchedOption) {
        selectItem(null);
      } else if (!hasSelectedOption && searchedOption) {
        selectItem(searchedOption);
      }
    }, [hasSelectedOption, options, searchTerm, selectItem]);

    return (
      <div className="relative w-full">
        <input type="hidden" {...rest} ref={ref} />

        <div className="form-control flex w-full">
          {label && <FormLabel {...getLabelProps()}>{label}</FormLabel>}
          <div className="flex items-center gap-0.5 bg-white">
            <input
              autoFocus={autoFocus}
              className="w-full px-4 py-3 bg-[#f6f6f6] border-2 placeholder:text-green-700 rounded-md outline-none focus:ring-4 border-green-500 focus:border-green-700 ring-green-100"
              placeholder={placeholder ?? "Selecione..."}
              {...getInputProps()}
            />
            {renderButton()}
          </div>
        </div>
        <ul
          {...getMenuProps()}
          className="menu menu-compact absolute z-50 max-h-60 w-full flex-row overflow-scroll bg-base-100 p-0 shadow lg:menu-normal"
        >
          {renderOptions()}
        </ul>
      </div>
    );

    function renderButton() {
      if (value) {
        return renderIconButton({
          "aria-label": "Limpar seleção",
          icon: "timesS",
          onClick: () => {
            selectItem(null);
          },
          tabIndex: -1,
        });
      }
      return renderIconButton({
        "aria-label": "Abrir a lista",
        icon: isOpen ? "chevronUpS" : "chevronDownS",
        ...getToggleButtonProps(),
      });
    }

    function renderIconButton(
      props: Omit<
        IconButtonProps,
        "className" | "iconProps" | "variant" | "ref"
      >
    ) {
      return (
        <IconButton
          className="absolute right-0 mx-0"
          iconProps={{ className: "w-4 h-4" }}
          variant="ghost"
          {...props}
        />
      );
    }

    function renderOptions() {
      if (isOpen) {
        return filteredOptions.map(renderOption);
      }
    }

    function renderOption(item: SelectOption, index: number) {
      const isActive = isOptionActive(item, index);
      return (
        <li
          className="w-full"
          key={item.value}
          {...getItemProps({ item, index })}
        >
          <button className={classNames({ active: isActive })}>
            {item.name}
          </button>
        </li>
      );
    }

    function isOptionActive({ value }: SelectOption, index: number) {
      if (highlightedIndex >= 0) {
        return highlightedIndex === index;
      }
      return selectedOption?.value === value;
    }

    function getFilteredOptions() {
      if (hasSelectedOption || !searchTerm) {
        return options;
      }

      return options.filter(filterOptions(searchTerm));
    }

    function filterOptions(searchTerm: string) {
      return function optionsFilter(option: SelectOption) {
        return option.name.toLowerCase().includes(searchTerm.toLowerCase());
      };
    }
  }
);

Select.displayName = "Select";

export default Select;
