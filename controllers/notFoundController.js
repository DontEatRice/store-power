/**
 * 
 * @param {object} param
 * @param {Response} param.res
 * @param {string} param.linkBack
 * @param {string} param.msg  
 */
export const showNotFoundPage = ({res, linkBack, msg}) => {
    res.render('pages/notFound', {
        linkBack,
        msg
    })
}