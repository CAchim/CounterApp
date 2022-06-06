using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace GlEmSe.Tester
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                using (var model = Data.Models.DataAcess.DBDataAcess())
                {
                    //Create new email with attachments
                    var path = @"D:\EmailTest";

                    var files = System.IO.Directory.GetFiles(path, "*.*", System.IO.SearchOption.TopDirectoryOnly);

                    var email = new Data.Email
                    {
                        Body = "Blabla",
                        DateCreated = DateTime.Now,
                        SenderDescription = "MeMyselfAndI",
                        SendTo = "rebecca-patricia.potocianu@continental.com",
                        Subject = "Test"
                    };

                    model.Emails.Add(email);

                    model.SaveChanges();

                    foreach (var file in files)
                    {
                        var fileInfo = new System.IO.FileInfo(file);

                        var attachment = new Data.Attachment
                        {
                            FileContent = System.IO.File.ReadAllBytes(file),
                            FileName = fileInfo.Name,
                            EmailId = email.Id
                        };

                        model.Attachments.Add(attachment);

                        model.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString());
            }
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            //try
            //{
            //    using (var client = new HttpClient())
            //    {
            //        var uri = new Uri("https://localhost:44311/api/glemse");

            //        var request = new Data.ViewModels.RequestViewModel
            //        {
            //            To = "rebecca-patricia.potocianu@continental.com",
            //            Cc = "marius.cismaru@continental-corporation.com",
            //            Body = "Teat from endpoint",
            //            Subject = "Test from endpoint",
            //            IsImportant = true,
            //            SenderDescription = "SenderDescription"
            //        };

            //        //Do this for attachments
            //        var path = @"D:\EmailTest";
            //        var files = System.IO.Directory.GetFiles(path, "*.*", System.IO.SearchOption.TopDirectoryOnly);

            //        foreach (var file in files)
            //        {
            //            var fileInfo = new System.IO.FileInfo(file);

            //            request.Files.Add(new Data.ViewModels.RequestFileViewModel
            //            {
            //                Name = fileInfo.Name,
            //                Content = Convert.ToBase64String(System.IO.File.ReadAllBytes(file))
            //            });
            //        }

            //        var json = Newtonsoft.Json.JsonConvert.SerializeObject(request);

            //        var content = new StringContent(json, Encoding.UTF8, "application/json");

            //        var response = client.PostAsync(uri, content).Result;
            //    }
            //}
            //catch (Exception ex)
            //{
            //    MessageBox.Show(ex.ToString());
            //}

            var path = @"D:\EmailTest";
            var files = System.IO.Directory.GetFiles(path, "*.*", System.IO.SearchOption.TopDirectoryOnly)
                .Select(o => new KeyValuePair<string, byte[]>((new System.IO.FileInfo(o)).Name, System.IO.File.ReadAllBytes(o)))
                .ToDictionary(o => o.Key, o => o.Value);

            Data.Libs.GlEmSeLib.SendEmail("rebecca-patricia.potocianu@continental.com", "", "", "Testul mare", "Niciunul", false, "De la mama lui", files);
        }
    }
}
