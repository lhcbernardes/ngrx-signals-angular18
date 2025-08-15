import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <div class="fixed-columns">
        <table>
          <thead>
            <tr>
              <th>Col1</th>
              <th>Col2</th>
              <th>Col3</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of data">
              <td>{{row.col1}}</td>
              <td>{{row.col2}}</td>
              <td>{{row.col3}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="scrollable-columns">
        <table>
          <thead>
            <tr>
              <th>Col4</th>
              <th>Col5</th>
              <th>Col6</th>
              <th>Col7</th>
              <th>Col8</th>
              <th>Col9</th>
              <th>Col10</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of data">
              <td>{{row.col4}}</td>
              <td>{{row.col5}}</td>
              <td>{{row.col6}}</td>
              <td>{{row.col7}}</td>
              <td>{{row.col8}}</td>
              <td>{{row.col9}}</td>
              <td>{{row.col10}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .table-container {
      display: flex;
      max-width: 100%;
    }
    .fixed-columns {
      position: sticky;
      left: 0;
      z-index: 2;
      background: white;
    }
    .scrollable-columns {
      overflow-x: auto;
      flex-grow: 1;
    }
    table {
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
      min-width: 100px;
    }
    .fixed-columns table {
      width: auto;
    }
    .scrollable-columns table {
      width: 2000px;
    }
    thead {
      position: sticky;
      top: 0;
      z-index: 3;
      background: white;
    }
  `]
})
export class PageComponent {
  data = Array.from({length: 10}, (_, i) => ({
    col1: 'Fixed1-' + i,
    col2: 'Fixed2-' + i,
    col3: 'Fixed3-' + i,
    col4: 'Dyn4-' + i,
    col5: 'Dyn5-' + i,
    col6: 'Dyn6-' + i,
    col7: 'Dyn7-' + i,
    col8: 'Dyn8-' + i,
    col9: 'Dyn9-' + i,
    col10: 'Dyn10-' + i
  }));
}
