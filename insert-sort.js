function insertionSort(tab)
{
    for (var i = 0; i < tab.length; i++)
    {
	var tmp = tab[i];
	for (var j = i; j > 0 && tmp < tab[j - 1]; j--)
	    tab[j] = tab[j - 1];
	tab[j] = tmp;
    }
    return tab;
}

var tab = [1, 9, 8, 2, 7, 6, 3, 5, 4, 0];
console.log("Initial table:");
console.log(tab.join(" "));
console.log("Sorted table:");
insertionSort(tab);
console.log(tab.join(" "));
