import { searchBooks } from './searchBooks';
import { displaySearchResults } from './display';

// Mock displaySearchResults
jest.mock('./display', () => ({
    displaySearchResults: jest.fn(),
}));

describe('searchBooks', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should call fetch with correct URL and displaySearchResults with fetched data', async () => {
        const mockResponse = {
            items: [
                { id: '1', volumeInfo: { title: 'Test Book', authors: ['Test Author'] } }
            ]
        };

        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        const title = 'Test Book';
        const author = 'Test Author';

        await searchBooks(title, author);

        expect(fetch).toHaveBeenCalledWith(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}`);
        expect(displaySearchResults).toHaveBeenCalledWith(mockResponse.items);
    });

    it('should handle errors', async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

        fetch.mockRejectOnce(new Error('Fetch failed'));

        await searchBooks('Test Book', 'Test Author');

        expect(consoleErrorMock).toHaveBeenCalledWith("Error fetching data:", expect.any(Error));

        consoleErrorMock.mockRestore();
    });
});
