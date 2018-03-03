function renderDOM (block, root) {
    root.appendChild(block.render());
}

export default renderDOM;