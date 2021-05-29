import React from 'react';
import {Document, Page, Canvas, Image, PDFDownloadLink, Svg, Path, StyleSheet, Text, View} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#e2e2e2'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
})
// Create Document Component
const myDocument = (icon, setCardData) => {
    const regex = /\"(.*?)\"/g;
    const formulaTags = icon.match(regex);
    // console.log(icon.replace('<svg', '<Svg heigth=40 ').replace('</sv', '</Sv').replace('<path', '<Path').replace('</path', '</Path').replace('fill-rule', 'fillRule'));
    // console.log(formulaTags[2]);

    return <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
                <Text>{setCardData[0][0].cardName}</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #3</Text>
            </View>
        </Page>
    </Document>
};

export const downloadSetAsPdf = (icon, setCardData) => {
    return <button className={'downloadPdfButton'}>
        <PDFDownloadLink document={myDocument(icon, setCardData)} fileName={"MtG_" + setCardData[0][0].setName.replaceAll(" ","_") + ".pdf"}>
            {({blob, url, loading, error}) =>
                loading ? 'Creating pdf' : 'Download pdf'
            }
        </PDFDownloadLink>
    </button>
}
