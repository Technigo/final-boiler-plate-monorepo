import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../../shadcn/Input";
const initialErrorState = { status: false, message: "" };

export const SearchInput = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hasError, setHasError] = useState(initialErrorState);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const popupRef = useRef(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      popupRef.current !== null &&
        !popupRef?.current?.contains(e.target as Node) &&
        setIsPopUpOpen(false);
    },
    [popupRef]
  );

  //close popup onclick
  useEffect(() => {
    isPopUpOpen
      ? document.addEventListener("mousedown", handleClick)
      : document.removeEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isPopUpOpen, handleClick]);

  const handleSeach = useCallback(async () => {
    setHasError(initialErrorState);
    if (searchWord === "") return null;
    try {
      setIsLoading(true);
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
      const data = await res.json();
      if (data?.length > 0) {
        setSearchResult(data);
        setIsPopUpOpen(true);
      } else {
        //make error message disappeared in 3000ms
        setHasError({ status: true, message: data.message });
        const deleteError = setTimeout(() => {
          setHasError(initialErrorState);
        }, 3000);

        return () => clearTimeout(deleteError);
      }
    } catch (err) {
      console.error(err);
      setHasError({ status: true, message: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [searchWord]);

  return (
    <>
      <div>
        <div className="relative">
          <label className="sr-only" htmlFor="search">
            Search
          </label>

          <Input
            className="w-full sm:w-56 border-black border-[0.5px]"
            id="search"
            type="search"
            placeholder="Search words..."
            onChange={(e) => setSearchWord(e.target.value)}
          />

          <button
            type="button"
            onClick={handleSeach}
            className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
          >
            {isLoading ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="h-4 w-4">
                <radialGradient
                  id="a5"
                  cx=".66"
                  fx=".66"
                  cy=".3125"
                  fy=".3125"
                  gradientTransform="scale(1.5)"
                >
                  <stop offset="0" stop-color="#0C4014"></stop>
                  <stop offset=".3" stop-color="#0C4014" stop-opacity=".9"></stop>
                  <stop offset=".6" stop-color="#0C4014" stop-opacity=".6"></stop>
                  <stop offset=".8" stop-color="#0C4014" stop-opacity=".3"></stop>
                  <stop offset="1" stop-color="#0C4014" stop-opacity="0"></stop>
                </radialGradient>
                <circle
                  transform-origin="center"
                  fill="none"
                  stroke="url(#a5)"
                  stroke-width="15"
                  stroke-linecap="round"
                  stroke-dasharray="200 1000"
                  stroke-dashoffset="0"
                  cx="100"
                  cy="100"
                  r="70"
                >
                  <animateTransform
                    type="rotate"
                    attributeName="transform"
                    calcMode="spline"
                    dur="2"
                    values="360;0"
                    keyTimes="0;1"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                  ></animateTransform>
                </circle>
                <circle
                  transform-origin="center"
                  fill="none"
                  opacity=".2"
                  stroke="#0C4014"
                  stroke-width="15"
                  stroke-linecap="round"
                  cx="100"
                  cy="100"
                  r="70"
                ></circle>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
            <span className="sr-only">Search</span>
          </button>
          {hasError.status && (
            <p className="text-xs absolute mt-2 bg-red-200 rounded-lg p-3">{hasError.message}</p>
          )}
          {isPopUpOpen && (
            <div className="absolute top-10 right-1 flex flex-col items-end z-10" ref={popupRef}>
              <div className="[clip-path:polygon(50%_0%,0%_100%,100%_100%)] bg-amber-50 w-6 h-9 -mb-2 mr-2"></div>
              <div className="h-80 w-80 bg-amber-50  rounded-md overflow-scroll p-3 shadow-lg">
                <div className="">
                  <div className="h-full text-black">
                    <h3 className="text-lg font-semibold">
                      search result : {searchResult[0]?.word.toUpperCase()}
                    </h3>
                    {searchResult.map((item) => (
                      <div key={item.meanings[0].definitions[0].definition}>
                        {item?.meanings?.map(
                          (words: {
                            partOfSpeech: string;
                            synonyms: Array<string>;
                            antonyms: Array<string>;
                            definitions: Array<{ definition: string }>;
                          }) => {
                            const { partOfSpeech, synonyms, antonyms } = words;
                            return (
                              <>
                                {words.definitions.map((word) => (
                                  <div
                                    className="border border-gray-200 p-1 my-2"
                                    key={word.definition}
                                  >
                                    <h5 className="font-semibold text-sm uppercase">
                                      Part of Speech : {partOfSpeech}
                                    </h5>
                                    <div className="my-2">
                                      <h5 className="text-sm font-semibold uppercase">
                                        Definition
                                      </h5>
                                      <p className="text-xs">{word.definition}</p>
                                    </div>

                                    {synonyms?.length !== 0 && (
                                      <div className="my-2">
                                        <h5 className="text-[13px] font-semibold uppercase">
                                          Synonyms
                                        </h5>
                                        <div className="flex flex-wrap gap-3">
                                          {synonyms?.map((item) => (
                                            <p
                                              className="bg-blue-light/50 px-2 py-0.5 text-xs"
                                              key={item}
                                            >
                                              {item}
                                            </p>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {antonyms?.length !== 0 && (
                                      <div className="my-2">
                                        <h5 className="text-[13px] font-semibold uppercase">
                                          Antonyms
                                        </h5>
                                        {antonyms?.map((item) => (
                                          <p
                                            className="bg-red-200 px-2 py-0.5 text-xs w-fit"
                                            key={item}
                                          >
                                            {item}
                                          </p>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </>
                            );
                          }
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
