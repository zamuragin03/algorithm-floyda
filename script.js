
const DrawTable = async () => {
    table.innerHTML = null
    let response = await fetch('http://127.0.0.1:8000/get_distances', {
        method: 'POST',
        body: JSON.stringify({ 'lst': JSON.parse(localStorage.getItem('elements')), }),
        headers: { "Content-type": "application/json;charset" }
    })
    let data = await response.json();
    console.log(data)
    let arr = data.dis

    for (let i = 0; i < arr.length; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < arr[i].length; j++) {
            let td = document.createElement("td");
            td.textContent = arr[j][i];
            tr.append(td);
        }
        table.append(tr);
    }
}

async function Draw() {
    let result_p = document.getElementById('result')

    result_p.innerHTML = ''

    let from = document.getElementsByName('from')[0].value
    let to = document.getElementsByName('to')[0].value
    let response = await fetch('http://127.0.0.1:8000/floyd', {
        method: 'POST',
        body: JSON.stringify({ 'lst': JSON.parse(localStorage.getItem('elements')), 'from': from, 'to': to }),
        headers: { "Content-type": "application/json;charset" }
    })
    let data = await response.json();
    console.log(data)
    let path = data.path
    ribs = []
    if (path.length==1){
        ribs.push('n' + path[0] + '-' + 'n' + path[0]);
    }
    for (let i = 0; i < path.length - 1; i++) {
        ribs.push('n' + path[i] + '-' + 'n' + path[i + 1]);
    }
    for (var i = 0; i < ribs.length; i++) {
        cy.$('#' + ribs[i]).select();
    }
    for (var i = 0; i < path.length; i++) {
        cy.$('#n' + path[i]).select();
    }
    result_p.innerHTML = 'The shortest path from ' + from + ' to ' + to + ' is ' + data.price

}

function Restore() {
    let elements = localStorage.getItem('elements') ? JSON.parse(localStorage.getItem('elements')) : []
    cy.add(elements)

}
function RemoveV() {
    let number = document.getElementsByName('rmv')[0].value
    let a = cy.$id(`n${number}`)
    cy.remove(a)

}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
var i = 0;
let Clear = () => {
    location.reload()
    localStorage.removeItem('elements')
}
let AddVertex = () => {
    console.log()
    length = document.getElementsByName('length')[0].value
    v1 = document.getElementsByName('v1')[0].value
    v2 = document.getElementsByName('v2')[0].value
    if (length < 0) {
        alert('Длина не должна быть отрицательной!')
        return
    }

    let elements = localStorage.getItem('elements') ? JSON.parse(localStorage.getItem('elements')) : []
    node1 = { group: 'nodes', data: { id: `n${v1}` }, position: { x: getRandom(20, 1500), y: getRandom(20, 500) } }
    node2 = { group: 'nodes', data: { id: `n${v2}` }, position: { x: getRandom(20, 1500), y: getRandom(20, 500) } }
    edge = { group: 'edges', data: { id: `n${v1}-n${v2}`, source: `n${v1}`, target: `n${v2}`, label: length } }
    elements.push(node1)
    elements.push(node2)
    elements.push(edge)
    localStorage.setItem('elements', JSON.stringify(elements))
    cy.add(elements)

}


let cy = cytoscape({
    container: document.getElementById('cy'),

    style: cytoscape.stylesheet()
        .selector('edge')
        .css({
            'width': 5,
            'line-color': '#369',
            'target-arrow-color': 'red',
            'target-arrow-shape': 'triangle',
            'target-arrow-fill': 'filled',
            'arrow-scale': 2,
            'label': 'data(label)',
            'font-size': '20px',
            'curve-style': 'bezier',
            'color': 'red'
        })
        .selector('node')
        .css({
            'content': 'data(id)',
            'text-valign': 'center',
            'color': 'white',
            'text-outline-width': 2,
            'text-outline-color': '#888',
            'background-color': '#888',
        })
        .selector(':selected')
        .css({
            'background-color': 'yellow',
            'line-color': 'yellow',
            'target-arrow-color': 'YELLOW',
            'source-arrow-color': 'black',
            'text-outline-color': 'black',
        }),

    layout: {
        name: 'grid',
        rows: 1
    }

});

cy.on('click', 'node', function (evt) {
    var node = evt.target;
    console.clear()
    console.log(node.position());
});

