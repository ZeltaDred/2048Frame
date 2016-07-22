#include "mainwindow.h"
#include <QApplication>

#include <QCommandLineParser>
#include <QCommandLineOption>

int main(int argc, char *argv[])
{
    // implement remote web page debugging
    #ifdef QT_DEBUG
        qputenv("QTWEBENGINE_REMOTE_DEBUGGING","9000");
    #endif

    // load the command line args to the application
    QApplication a(argc, argv);



    // Set globals  for  unique settings storage
    QCoreApplication::setOrganizationName("sciTools");
    QCoreApplication::setOrganizationDomain("sciTools.com");
    QCoreApplication::setApplicationName("protoCharts");
    QCoreApplication::setApplicationVersion(QT_VERSION_STR);

//    QCommandLineParser parser;
//    parser.setApplicationDescription(QCoreApplication::applicationName());
//    parser.addHelpOption();
//    parser.addVersionOption();
//    parser.process(a);

    // instantiate a MainWindow object
    MainWindow w;

    // show the window
    w.show();

    return a.exec();
}
