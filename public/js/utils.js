function getParentSiteURL(ancestors = 1) {
    if (ancestors < 1)
        throw new RangeError('Number of ancestors to skip must be at least one')
    
    const path = document.location.pathname.replace(/\/$/gm, '')
    const sites = path.split('/').slice(0, -ancestors)
    sites.shift()
    return '/' + sites.join('/')
}