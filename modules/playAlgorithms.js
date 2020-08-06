function humanPlay(ev) {
    console.log(ev.target.id, this.name);
}

function aiPlay() {
    console.log(Math.random() * 9, this.name);
}

export { humanPlay, aiPlay };
