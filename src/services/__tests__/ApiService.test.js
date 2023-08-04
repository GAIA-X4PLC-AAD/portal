import {ApiService} from "../ApiService";

describe('_ call GET data', () => {
    it('_ valid request _ response is correct', async () => {
        // Arrange
        // Act
        const response = await ApiService.get();

        // Assert
        console.log(response)
    });
});
