export const KEYWORD_SEARCH = 'search/KEYWORD_SEARCH';

export const keywordSearch = (keyword) => {
    return { 
        type: KEYWORD_SEARCH, 
        payload: keyword,
    };
};