﻿function shouldChase(creep, hostile, protectionRadius) {
    // Determine if we are in firing range
    var maxRange = Math.max(firingRange(creep), firingRange(hostile));
    if (creep.pos.inRangeTo(hostile.pos, maxRange)) {
        return true;
    }
    
    var typesToProtect = [Game.MY_CREEPS, Game.MY_SPAWNS, Game.MY_STRUCTURES];
    var unitsToProtect = typesToProtect.selectMany(function (type) {
        return creep.room.find(type);
    }).where(function (unit) {
            return unit.id !== creep.id && unit.pos.inRangeTo(hostile.pos, protectionRadius);
        });
    
    var firstUnitToProtect = unitsToProtect.firstOrDefault();
    return firstUnitToProtect !== undefined && firstUnitToProtect !== null;
}

function shouldChaseFilter(creep, protectionRadius) {
    return function (hostile) {
        return shouldChase(creep, hostile, protectionRadius);
    };
}

function firingRange(creep) {
    function partRange(part) {
        switch (part.type) {
            case Game.RANGED_ATTACK:
                return 3;
            case Game.ATTACK:
                return 1;
            default:
                return 0;
        }
    }
    
    return creep.body.select(partRange).max();
}

module.exports = {
    // Determines if this creep should chase a hostile creep.
    // Attempts to protect all friendlies within a given radius.
    // Will only exit that radius if this creep and the hostile
    // creep are within firing range (either direction).
    shouldChase: shouldChase,
    
    // Creates a filter to remove hostiles that should not be chased
    shouldChaseFilter: shouldChaseFilter,
    
    // Determines the firing range of a creep
    firingRange: firingRange
};