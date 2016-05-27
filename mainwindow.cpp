#include "mainwindow.h"
#include "ui_mainwindow.h"
#include<QWebEngineSettings>
#include <QWebEngineView>
#include <QSettings>
#include <QDesktopWidget>


MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    // initialize a window for the tree view
    m_logoWebPage = new QWebEngineView(this);

    //initialize a window for the chart view
    m_projWebPage = new QWebEngineView(this);

    // initialize a window for the tree view
    m_treeWebPage = new QWebEngineView(this);

    //initialize a window for the chart view
    m_chrtWebPage = new QWebEngineView(this);

    // add the  widgets to the main window
    ui->gridLayout->addWidget(m_logoWebPage,0,0);
    ui->gridLayout->addWidget(m_projWebPage,0,1);

    ui->gridLayout->addWidget(m_treeWebPage,1,0);
    ui->gridLayout->addWidget(m_chrtWebPage,1,1);

    // specify a relative size for each  widget
    //   1/4 of the screen  for the logo & tree
    ui->gridLayout->setColumnStretch(0,1);
    ui->gridLayout->setRowStretch(0,1);

    //   3/4s of the screen  for the Project & Charting
    ui->gridLayout->setColumnStretch(1,3);
    ui->gridLayout->setRowStretch(1,4);

    // START: set QWebEngine to accept local files.
    //  Test  status of  local and global settings
    //  set enable to true in all manners  possible
    bool enableLocalFileStuff = true; // <-- this has no influence really, even though it should.

    //Once each for the  tree  and chart  windows
    QWebEngineSettings *cSettings = m_chrtWebPage->settings();
    QWebEngineSettings *tSettings = m_treeWebPage->settings();

    cSettings->setAttribute(QWebEngineSettings::LocalContentCanAccessRemoteUrls, enableLocalFileStuff);
    cSettings->setAttribute(QWebEngineSettings::LocalContentCanAccessFileUrls, enableLocalFileStuff);
    tSettings->setAttribute(QWebEngineSettings::LocalContentCanAccessRemoteUrls, enableLocalFileStuff);
    tSettings->setAttribute(QWebEngineSettings::LocalContentCanAccessFileUrls, enableLocalFileStuff);

    cSettings = m_chrtWebPage->page()->settings();
    cSettings->setAttribute(QWebEngineSettings::LocalContentCanAccessRemoteUrls, enableLocalFileStuff);
    cSettings->setAttribute(QWebEngineSettings::LocalContentCanAccessFileUrls, enableLocalFileStuff);

    tSettings = m_treeWebPage->page()->settings();
    tSettings->setAttribute(QWebEngineSettings::LocalContentCanAccessRemoteUrls, enableLocalFileStuff);
    tSettings->setAttribute(QWebEngineSettings::LocalContentCanAccessFileUrls, enableLocalFileStuff);

    QWebEngineSettings::globalSettings()->setAttribute(QWebEngineSettings::LocalContentCanAccessFileUrls, enableLocalFileStuff);
    QWebEngineSettings::globalSettings()->setAttribute(QWebEngineSettings::LocalContentCanAccessRemoteUrls, enableLocalFileStuff);

    QWebEngineSettings::defaultSettings()->setAttribute(QWebEngineSettings::LocalContentCanAccessFileUrls, enableLocalFileStuff);
    QWebEngineSettings::defaultSettings()->setAttribute(QWebEngineSettings::LocalContentCanAccessRemoteUrls, enableLocalFileStuff);

    readSettings();

    m_logoWebPage->load(QUrl("qrc:/LogoBlock.html"));
    m_treeWebPage->load(QUrl("qrc:/tree.html"));
    m_chrtWebPage->load(QUrl("qrc:/index.html"));

}

void MainWindow::readSettings()
{
    QSettings settings(QCoreApplication::organizationName(), QCoreApplication::applicationName());
    const QByteArray geometry = settings.value("geometry", QByteArray()).toByteArray();
    if (geometry.isEmpty()) {
        const QRect availableGeometry = QApplication::desktop()->availableGeometry(this);
        resize((availableGeometry.width() / 10) * 7, (availableGeometry.height() / 10) * 7);
        move((availableGeometry.width() - width()) / 2,
             (availableGeometry.height() - height()) / 2);
    } else {
        restoreGeometry(geometry);
    }
}

void MainWindow::writeSettings()
{
    QSettings settings(QCoreApplication::organizationName(), QCoreApplication::applicationName());
    settings.setValue("geometry", saveGeometry());
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::closeEvent(QCloseEvent *event)
{
    writeSettings();
}
