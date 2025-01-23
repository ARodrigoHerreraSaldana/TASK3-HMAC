export function countWins(string1, string2) {
    const a = string1.split(',').map(Number);
    const b = string2.split(',').map(Number);
    const results = a.flatMap(f => b.map(y => f > y));
    console.log(results);
    if(string1!=string2)
    {
        return ((results.filter(result => result).length)/36).toPrecision(4);
    }
    
    else
    {
        return (((results.filter(result => result).length)/36).toPrecision(4))*-1
    }
    }

