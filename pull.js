const jsdom = require("jsdom");

const {
    JSDOM
} = jsdom;

// Ids of the headers above the tables to parse
const headerIds = ['Specifically_dedicated_video_hosting_websites', 'Websites_dedicated_to_adult_and_pornographic_video_sharing'];

const findTable = (id, dom) => {
    const header = dom.window.document.getElementById(id);
    return header && header.parentElement.nextElementSibling;
};

const pageToDomain = async (link) => {
    const dom = await JSDOM.fromURL(link);
    try {
        const a = dom.window.document.querySelector(".infobox .url a");
        const foundUri = (a && a.href) || 'http://' + dom.window.document.querySelector(".infobox .url").innerHTML;
        const url = new URL(foundUri);
        return url.hostname.replace(/^www./i, '');
    } catch (e) {
        console.error(`Unable to get a URL for ${link}.`);
        return null;
    }
};

const tableToDomains = (table) => {
    const rows = table.getElementsByTagName('tr');
    return [...rows].map((row, i) => {
        if (i === 0) return null;
        const wikipediaLink = row.getElementsByTagName('td')[0].getElementsByTagName('a')[0].href;
        return pageToDomain(wikipediaLink);
    });
};

const main = async () => {
    const dom = await JSDOM.fromURL('https://en.wikipedia.org/wiki/List_of_online_video_platforms');
    const hosts = (await Promise.all(
        headerIds.flatMap(id => {
            const table = findTable(id, dom);
            if (!table) throw new Error(`Unable to locate table for #${id}`);
            const ret = tableToDomains(table).flat().filter(x => !!x);
            return ret;
        })
    )).filter(x => !!x).filter(x => x !== 'en.wikipedia.org').sort();
    console.log("## List provided by https://github.com/wilwade/pihole-block-video\n");
    console.log('## Hosts from https://en.wikipedia.org/wiki/List_of_online_video_platforms');
    hosts.map(h => console.log(h));
};

main();
