exports = {}
const mutationObserverCallback: MutationCallback  = (mutations, observer) => {
console.log("mutations: ",mutations)
}
const config: MutationObserverInit = {
    attributes: true,
    subtree: true,
    childList: true
}
const al_attr = 'data-arialive-mutatobs-set'
const MonitorAriaLive = ()=>{
    const body = document.querySelector('body')
    if (body.attributes.getNamedItem(al_attr)) {
        console.log("Aria live mutation observers already set")
        return
    }
    document.querySelectorAll('[aria-live]').forEach(x=>{
        const mo = new MutationObserver(mutationObserverCallback)
        mo.observe(x, config)
    })
    body.setAttribute(al_attr, '')

}

MonitorAriaLive()
