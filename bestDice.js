export function countWins(string1, string2) {
    const a = string1.split(',').map(Number);
    const b = string2.split(',').map(Number);
    const results = a.flatMap(f => b.map(y => f > y));
    const winCount = results.filter(result => result).length / 36;
    const precisionResult = winCount.toPrecision(4);
    return string1 !== string2 ? precisionResult : -precisionResult;
}
