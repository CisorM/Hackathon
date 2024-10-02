import { Component, OnInit } from '@angular/core';
import { Side2Component } from '../../../Shared/side2/side2.component';
import { H1Component } from '../../../Shared/h1/h1.component';
import { H2Component } from '../../../Shared/h2/h2.component';

import { getUserInfoFromToken } from '../../../custom/getJwtInfo';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { mostDonatedInterface } from '../../../Core/Interfaces/mostDonatedMedicines.interface';
import {
  mostRequiredByCommunityInterface,
  mostRequiredInterface,
} from '../../../Core/Interfaces/mostRequiredMedicines.interface';
import { PathologiesPerPatient } from '../../../Core/Interfaces/pathologiesPerPatient.interface';
import { appSettings } from '../../../settings/appsettings';
import { getCookieHeader } from '../../../custom/getCookieHeader';

Chart.register(...registerables);

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [Side2Component, H1Component, H2Component],
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.css'],
})
export default class DashAdminComponent implements OnInit {
  public name: string = '';
  public mostDonatedMedicines: mostDonatedInterface | null = null;
  public mostRequiredMedicines: mostRequiredInterface | null = null;
  public mostRequiredPerCommunity: mostRequiredByCommunityInterface | null =
    null;
  public pathologiesPerPatient: PathologiesPerPatient | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const { name } = getUserInfoFromToken();
    this.name = name;
    this.loadData();
  }

  loadData() {
    const { headers } = getCookieHeader();
    this.http
      .get<mostDonatedInterface>(
        `${appSettings.apiUrl}medication/getMostDonated/`,
        { headers }
      )
      .subscribe((Response) => {
        this.mostDonatedMedicines = Response;

        this.renderMostDonatedChart();
      });

    this.http
      .get<mostRequiredInterface>(
        `${appSettings.apiUrl}medication/getMostRequired/`,
        { headers }
      )
      .subscribe((data) => {
        this.mostRequiredMedicines = data;
        this.renderMostRequiredChart();
      });

    this.http
      .get<mostRequiredByCommunityInterface>(
        `${appSettings.apiUrl}medication/getMostRequeriedByCommunity`,
        { headers }
      )
      .subscribe((data) => {
        this.mostRequiredPerCommunity = data;
        this.renderMostRequiredByCommunityChart();
      });

    this.http
      .get<PathologiesPerPatient>(
        `${appSettings.apiUrl}pathology/getPatientCount`,
        { headers }
      )
      .subscribe((data) => {
        this.pathologiesPerPatient = data;
        this.renderPhatologiesPerPatientChart();
      });
  }

  renderMostDonatedChart() {
    if (this.mostDonatedMedicines) {
      const firstFiveMedicines =
        this.mostDonatedMedicines.data.Medication.slice(0, 5);

      const labels = firstFiveMedicines.map((med) => med.medication_name);
      const data = firstFiveMedicines.map((med) => parseInt(med.total_donated));

      new Chart('Chart1', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: this.getColors(labels.length),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  renderMostRequiredChart() {
    if (this.mostRequiredMedicines) {
      const firstFiveMedicines =
        this.mostRequiredMedicines.data.Medication_Treatment.slice(0, 5);
      const labels = firstFiveMedicines.map((med) => med.medication_name);
      console.log(firstFiveMedicines);
      const data = firstFiveMedicines.map((med) => med.total_quantity);

      new Chart('Chart2', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: this.getColors(labels.length),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  renderPhatologiesPerPatientChart() {
    if (this.pathologiesPerPatient) {
      const firstFivePathologies =
        this.pathologiesPerPatient?.data.patientCountByPathology.slice(0, 5);
      console.log(this.pathologiesPerPatient);
      const labels = firstFivePathologies!.map((path) => path.pathology_name);
      const data = firstFivePathologies!.map((path) => path.patient_count);

      new Chart('Chart4', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: this.getColors(labels.length),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  renderMostRequiredByCommunityChart() {
    if (this.mostRequiredPerCommunity) {
      const communities = this.mostRequiredPerCommunity;

      const labels = communities.data.Medication.map(
        (comm) => comm.community_name
      );
      const data = communities.data.Medication.map((comm) => {
        return comm.medications.reduce(
          (total, medic) => total + medic.total_medicamentos_necesitados,
          0
        );
      });

      new Chart('Chart3', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: this.getColors(labels.length),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  getColors(numColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`hsl(${(i * 360) / numColors}, 70%, 50%)`);
    }
    return colors;
  }
}
