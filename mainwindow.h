#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QWebEngineView>

namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

protected:
    void closeEvent(QCloseEvent *event) Q_DECL_OVERRIDE;

private:
    Ui::MainWindow *ui;

    void readSettings();
    void writeSettings();

    QWebEngineView* m_logoWebPage;
    QWebEngineView* m_projWebPage;
    QWebEngineView* m_cntrlWebPage;
    QWebEngineView* m_chrtWebPage;
};

#endif // MAINWINDOW_H
