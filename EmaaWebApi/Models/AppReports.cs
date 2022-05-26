using EmaaWebApi.Controllers;
using EmaaWebApi.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmaaWebApi.Models
{
    public class AppReports
    {
        public Rpt_Pld Pld { get; set; } = new Rpt_Pld();

        public RptchangementStatus ChangementStatus { get; set; } = new RptchangementStatus();

        public RptDemandeTraveau DemandeTraveau { get; set; } = new RptDemandeTraveau();


        public RptFicheDiscours FicheDiscours { get; set; } = new RptFicheDiscours();


        public RptRenouvelementContrat RenouvelementContrat { get; set; } = new RptRenouvelementContrat();

        public RptPldVoyage PldVoyage { get; set; } = new RptPldVoyage();

        public Rpt_punition Punition { get; set; } = new Rpt_punition();




    }
}
