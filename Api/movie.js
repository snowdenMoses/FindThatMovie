import axios from 'axios';


export default axios.create({
baseURL: 'https://api.themoviedb.org/3/search',
header: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTY0YTYyM2ZkNTEyNTkxMTI2MmVjYTVhODc3MzBhNSIsInN1YiI6IjVmNTc1Y2ZmOWQ4OTM5MDAzNGQ0MzdjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ui5pRV8PydIZpJ7zYTP7BZjOZUeijRnaW8HrZpptMcQ'
}

});
