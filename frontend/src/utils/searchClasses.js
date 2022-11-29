const searchClassNames = (widthClass) => ({
  root: `react-tags ${widthClass} mx-auto flex flex-wrap items-center border hover:shadow-md`,
  rootFocused: "is-focused",
  selected: "react-tags__selected",
  selectedTag:
    "react-tags__selected-tag text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease",
  selectedTagName: "react-tags__selected-tag-name",
  search: "react-tags__search",
  searchWrapper: "react-tags__search-wrapper",
  searchInput: "react-tags__search-input w-full bg-transparent py-[14px] pl-2 outline-none",
  suggestions: "react-tags__suggestions",
  suggestionActive: "is-active",
  suggestionDisabled: "is-disabled",
  suggestionPrefix: "react-tags__suggestion-prefix",
});

export default searchClassNames;