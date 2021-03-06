var log = false;
module.exports = function spawnFactory(x, y) {		
    var spawns = Object.keys(Game.spawns);
    var spawnName = spawns.firstOrDefault();
    if (spawnName === undefined || spawnName === null) {
        //TODO: Create spawn at x, y
        return null;
    }
    if (log) {
        console.log('Found spawn: \'' + spawnName + '\'');
    }
    return Game.spawns[spawnName];
}