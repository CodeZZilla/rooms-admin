import MaterialTable from "material-table";
import '@material-ui/icons'
import {createTheme, MuiThemeProvider} from "@material-ui/core";

export default function ActionTable(props) {
    const columns = [
        {title: 'ID Телеграму', field: 'idTelegram'},
        {title: "nickname", field: 'nickname'},
        {title: 'Фамілія', field: 'surname'},
        {title: "Імя", field: 'name'},
        {title: 'Номер', field: 'phoneNumber'},
        {title: "К-сть днів до оновлення підписки", field: 'lessDays'},
        {title: 'Дата регестрації', field: 'date'},
        {title: 'Отримано квартир', field: 'rooms'},
        {title: 'Етап', field: 'stage'},
    ]

    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000',
            },
            secondary: {
                main: '#000000',
            },
        },

    });

    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable columns={columns} data={props.data} options={props.options} title={props.title}
                           actions={props.action}
                           editable={props.editable}
                           onSelectionChange={props.onSelectionChange}
                           localization={{
                               pagination: {
                                   labelDisplayedRows: '{from}-{to} з {count}',
                                   labelRowsSelect: 'запісів показано',
                                   nextTooltip: 'Вперед',
                                   previousTooltip: 'Назад',
                                   lastTooltip: 'Кінець',
                                   firstTooltip: 'Початок'
                               },
                               toolbar: {
                                   nRowsSelected: '{0} користувачів вибранно',
                                   searchTooltip: 'Пошук',
                                   searchPlaceholder: 'Пошук'
                               },
                               body: {
                                   emptyDataSourceMessage: 'Дані про користувачів відсутні'
                               }
                           }}/>
        </MuiThemeProvider>

    )
}