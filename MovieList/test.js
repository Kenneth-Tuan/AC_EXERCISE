let Vehicles = [
    {InStock:12, Brand:"Oldsmobile", Year:"2006-2008"},
    {InStock:3, Brand:"Pontiac", Year:"2008-2010"},
    {InStock:5, Brand:"Buick", Year:"2009-2010"},
    {InStock:53, Brand:"Cadillac", Year:"2011-2013"},
    {InStock:12, Brand:"Holden", Year:"2004-2006"},
    {InStock:53, Brand:"Saturn", Year:"2009-2013"},
    {InStock:47, Brand:"GMC", Year:"2007-2008"}
    ]

Vehicles = Vehicles.sort(function (a, b) {
        return a.Year < b.Year ? 1 : -1;
       })

console.log(Vehicles)