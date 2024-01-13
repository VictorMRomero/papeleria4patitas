

export const geratePagination =  (currentPage: number, totalPages: number) => {

    //si numero total es 7 o menos, mostraremos todas las paginas

    if(totalPages <= 7) {
        return Array.from({length:totalPages},(_, i) => i + 1);

    }

    // si la pagina esta entre las 3 primeras paginas las mostraremos

    if(currentPage <= 3) {
        return [1,2,3, '...', totalPages -1, totalPages];

    }

    //si la pagina entre los ultimos 3 mostraremos las primeras 2 y las ultimas 3
    if(currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages -2, totalPages -1, totalPages];

    } 

    //si la pagina actual esta en otro lugar mostrar la primera 

    return [1, '...', currentPage-1, currentPage, currentPage+1, '...', totalPages]
}