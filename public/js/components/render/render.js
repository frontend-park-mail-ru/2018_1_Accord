/**
 *
 * @param {HTMLElement} child
 * @param {HTMLElement} root
 */

function renderDOM (child, root) {
    while(root.firstChild) {
        root.removeChild(root.firstChild);
    }

    root.appendChild(child);
}

export default renderDOM;