
const NextPage = ({ page, setPage, info }) => {

    return (
        <header className="headerNextPage">

            <div className="containerBtn">

                <button
                    className={`preview red ${page > 1 ? '' : 'none'}`}
                    onClick={page > 1 ? () => setPage(page - 1) : () => setPage(page)} >
                    Page {page - 1}
                </button>
                <button
                    className={`preview blue ${page < info.pages ? '' : 'none'}`}
                    onClick={page <= info.pages ? () => setPage(page + 1) : () => setPage(page)} >
                    Page {page < info.pages ? page + 1 : '1'}
                </button>
            </div>
        </header>
    )
}

export default NextPage