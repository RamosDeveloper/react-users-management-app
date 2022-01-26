const Loading = () => {
    return (
        <div className="loading-container d-flex align-items-center justify-content-center h-100">
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
};

export default Loading;