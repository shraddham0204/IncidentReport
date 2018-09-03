export const AlertHideShow = (hideShow) => {
    console.log("hideShow" + hideShow);
    return {
        type: 'hideShow',
        payload: hideShow
    };
};
