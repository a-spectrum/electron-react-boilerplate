import React, {Fragment} from 'react';
import './styles.css';

const PdfPrinter = () => {

    const createPage = () => {
        return <Fragment>
            <table>
                <thead>
                <tr>
                    <td>
                        <div className={"pdf-header-space"}>&nbsp;</div>
                    </td>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>
                        <div className={"pdf-content"}>
                            <p>content line 1</p>
                            <p>content line 2</p>
                            <p>content line 3</p>
                        </div>
                    </td>
                </tr>
                </tbody>

                <tfoot>
                <tr>
                    <td>
                        <div className={"pdf-footer-space"}>&nbsp;</div>
                    </td>
                </tr>
                </tfoot>

            </table>
            <div className={"pdf-header"}>
                <h2>header</h2>
            </div>
            <div className={"pdf-footer"}>
                <h2>footer</h2>
            </div>
        </Fragment>
    }

    return <button onClick={() => {
    window.print()}
    }>PRINT TEST</button>
}

export default PdfPrinter;
