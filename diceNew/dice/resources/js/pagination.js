export default function pagination(paginations, pageIndex) {
    let paginationList = null;
    if (paginations <= 5) {
        paginationList = [...range(0, paginations, 1)];
        return paginationList;
    }
    if (paginations > 5 && pageIndex < 4) {
        paginationList = [...range(0, 3, 1), "..." , paginations];
        return paginationList;
    }
    if (paginations > 5 && pageIndex < paginations - 3) {
        paginationList = [ 0, "...", ...range(pageIndex - 2, pageIndex + 2, 1), "..." , paginations  ];
        return paginationList;
    }
    if (paginations > 5 && pageIndex >= paginations - 3) {
        paginationList = [ 0, "...", ...range(paginations - 3, paginations, 1) ];
        return paginationList;
    }
}

function range(start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 },
        (value, index) => start + index * step);
}
