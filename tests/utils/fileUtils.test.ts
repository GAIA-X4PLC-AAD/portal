import { downloadFile } from '../../src/utils/fileUtils';

describe('downloadFile', () => {
  beforeEach(() => {
    document.createElement = jest.fn().mockReturnValue({
      href: '',
      download: '',
      click: jest.fn(),
    } as unknown as HTMLAnchorElement);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    URL.createObjectURL = jest.fn().mockReturnValue('blob:url');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a download link and trigger a download', () => {
    const fileName = 'testFile';
    const data = { key: 'value' };

    downloadFile(fileName, data);

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();

    const element = document.createElement('a') as HTMLAnchorElement;
    expect(element.href).toBe('blob:url');
    expect(element.download).toBe('testFile.json');
    expect(element.click).toHaveBeenCalled();
  });

  it('should log an error if an exception occurs', () => {
    console.error = jest.fn();

    const fileName = 'testFile';
    const data = { key: 'value' };

    document.createElement = jest.fn(() => {
      throw new Error('Test error');
    });

    downloadFile(fileName, data);

    expect(console.error).toHaveBeenCalledWith('Error:', new Error('Test error'));
  });
});
