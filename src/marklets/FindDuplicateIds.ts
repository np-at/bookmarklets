const findDuplicateIds = () => {
    let a: string[] = Array.from(document.querySelectorAll('*')).map(x => x.id).filter(x => !!x)
    let b: Array<HTMLElement> = new
    (Array.from(document.querySelectorAll('*')) as Array<HTMLElement>).forEach(x => {
        if (a.filter(f => (f == x.id)).length > 1) {
            b.push(x)
        }
    })
    b.forEach(x => {
        x.style.outline = '2px solid orange';
        x.style.border = '2px solid red';
        x.style.outlineOffset = '2px';
    })
    console.dir(b)
}
findDuplicateIds()
