using Application.Services.Interfaces;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;

namespace Infrastructure.Services
{
    public class EncryptionService : IEncryptionService
    {
        private readonly byte[] key, iv;

        public EncryptionService()
        {
            key = Encoding.UTF8.GetBytes("12345678901234567890123456789012");
            iv  = Encoding.UTF8.GetBytes("1234567890123456");
        }
        public string? Decrypt(string cipherText)
        {
            if (cipherText is null)
                return null;

            using var aes = Aes.Create();
            aes.Key = key;
            aes.IV = iv;

            using var decryptor = aes.CreateDecryptor(key, iv);
            using var mStream = new MemoryStream(Convert.FromBase64String(cipherText));
            using var cryptoStream = new CryptoStream(mStream, decryptor, CryptoStreamMode.Read);
            using var rStream = new StreamReader(cryptoStream);

            return rStream.ReadToEnd();
        }

        public string? Encrypt(string data)
        {
            if (data is null)
                return null;

            byte[] cipherText;
            using var aes = Aes.Create();
            aes.Key = key;
            aes.IV = iv;

            using var encryptor = aes.CreateEncryptor(key, iv);
            using (var mStream = new MemoryStream())
            {
                using (var cryptoStream = new CryptoStream(mStream, encryptor, CryptoStreamMode.Write))
                { 
                    using (var writer = new StreamWriter(cryptoStream))
                    {
                        writer.Write(data);
                        writer.Flush();
                    }
                    cipherText = mStream.ToArray();
                }
            }

            return Convert.ToBase64String(cipherText);
        }
    }
}

