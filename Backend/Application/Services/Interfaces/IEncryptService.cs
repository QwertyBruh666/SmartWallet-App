namespace Application.Services.Interfaces
{
    public interface IEncryptionService
    {
        string Encrypt(string data);
        string Decrypt(string cipherText);
    }
}