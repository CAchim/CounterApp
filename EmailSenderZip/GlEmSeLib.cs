using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace GlEmSe.Data.Libs
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public static class GlEmSeLib
    {
        public static KeyValuePair<bool, string> SendEmail(string to, string cc, string bcc, string subject, string body, bool isImportant, string senderDescription, Dictionary<string, byte[]> files = null)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var uri = new Uri("https://tmas336a:9005/api/glemse");

                    var request = new RequestViewModel
                    {
                        To = to,
                        Cc = cc,
                        Bcc = bcc,
                        Body = body,
                        Subject = subject,
                        IsImportant = isImportant,
                        SenderDescription = senderDescription
                    };


                    if ((files != null) && (files.Count > 0))
                    {
                        foreach (var file in files)
                        {
                            request.Files.Add(new RequestFileViewModel
                            {
                                Name = file.Key,
                                Content = Convert.ToBase64String(file.Value)
                            });
                        }
                    }

                    var json = Newtonsoft.Json.JsonConvert.SerializeObject(request);

                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    var response = client.PostAsync(uri, content).Result;

                    return new KeyValuePair<bool, string>(true, string.Empty);
                }
            }
            catch (Exception ex)
            {
                return new KeyValuePair<bool, string>(false, ex.ToString());
            }
        }

        private class RequestViewModel
        {
            public string To { get; set; }

            public string Cc { get; set; }

            public string Bcc { get; set; }

            public string Subject { get; set; }

            public string Body { get; set; }

            public bool IsImportant { get; set; }

            public string SenderDescription { get; set; }

            public List<RequestFileViewModel> Files { get; set; }

            public RequestViewModel()
            {
                Files = new List<RequestFileViewModel>();
            }
        }

        private class RequestFileViewModel
        {
            public string Name { get; set; }

            public string Content { get; set; }
        }
    }
}
