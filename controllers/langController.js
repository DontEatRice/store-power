export const changeLang = (req, res) => {
    const newLang = req.params.lang

    if (['pl', 'en'].includes(newLang)) {
        res.cookie('pma_lang', newLang, {
            httpOnly: true
        })
    }

    if (req.query.redirectURL) {
        return res.redirect(req.query.redirectURL)
    }

    res.redirect('/')
}