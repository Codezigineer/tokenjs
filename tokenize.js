const zones = [
    // Numbers

    [[48, 57], [0x2000, 0x206F]],
    
    // Alphabet

    [[65, 90], [97, 122], [138, 138], [140, 140], [142, 142], [192, 214], [216, 246], [248, 255]],
    
    [[0x370, 0x3FF], [0x1F00, 0x1FFF]],
    [[0x400, 0x52F]],
    [[0x530, 0x58F]],
    [[0x590, 0x5FF]],
    [[0x600, 0x6FF]],
    [[0x700, 0x74F]],
    [[0x780, 0x7BF]],
    [[0x900, 0x97F]],
    [[0x980, 0x9FF]],
    [[0xA00, 0xA7F]],
    [[0xA80, 0xAFF]],
    [[0xB00, 0xB7F]],
    [[0xB80, 0xBFF]],
    [[0xC00, 0xC7F]],
    [[0xC80, 0xCFF]],
    [[0xD00, 0xD7F]],
    [[0xD80, 0xDFF]],
    [[0xE00, 0xE7F]],
    [[0xE80, 0xEFF]],
    [[0xF00, 0xFFF]],
    [[0x1000, 0x109F]],
    [[0x10A0, 0x10FF]],
    [[0x1100, 0x11FF]],
    [[0x1200, 0x137F]],
    [[0x13A0, 0x13FF]],
    [[0x1400, 0x167F]],
    [[0x1680, 0x169F]],
    [[0x16A0, 0x16FF]],
    [[0x1700, 0x171F]],
    [[0x1720, 0x173F]],
    [[0x1740, 0x175F]],
    [[0x1760, 0x177F]],
    [[0x1780, 0x17FF]],
    [[0x1800, 0x18AF]],
    [[0x1900, 0x194F]],
    [[0x1950, 0x197F]],
    [[0x19E0, 0x19FF]],
    [[0x1D00, 0x1D7F]],
    [[0x1E00, 0x1EFF]],
];

function rangeOf(c)
{

    for(let i = 0; i != zones.length; i++)
    {
        let isInZone = false;
        for(let j = 0; j != zones[i].length; j++)
            isInZone = isInZone || ((c > (zones[i][j][0]-1)) && (c < (zones[i][j][1]+1)));
        if(isInZone) return i;
    };

    return -Math.random();
};

function tokenize(text)
{
    let list = [];

    for(const c of text.split(''))
    {
        if(list.length === 0) list.push([c]);
        else
        {
            const prevtoken = list[list.length-1];
            if(rangeOf(prevtoken[prevtoken.length-1].charCodeAt(0)) === rangeOf(c.charCodeAt(0))) list[list.length-1].push(c);
            else list.push([c]);
        };
    };
    
    return list.map(i => i.join(''));
};

function concordance(tokenList)
{
    let res = {};
    
    for(const token of tokenList)
    {
        if(res[token] !== undefined) res[token]++;
        else res[token] = 1;
    };

    return res;
};

function sortConcordance(conc)
{
    let arr = Object.keys(conc);
    return arr.sort((a, b) => (conc[a] > conc[b]) ? -1 : 1);
};

// Replaces tokens in an array with their indexes in an concordance/vocabulary, or -1 if nonexistent.
function tokenizeFromConcordance(tokenList, concordanceTokens)
{
    let res = [];

    for(const i of tokenList) res.push(concordanceTokens.indexOf(i));

    return res;
};

module.exports = {
                    tokenize,
                    concordance,
                    sortConcordance,
                    tokenizeFromConcordance
                };