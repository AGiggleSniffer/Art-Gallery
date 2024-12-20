exports.paginationBuilder = (page, size) => {
	page = Number(page);
	size = Number(size);

	const pagination = {};
	if (page > 0 && size > 0) {
		pagination.limit = size;
		pagination.offset = size * (page - 1);
	}

	return pagination;
}
