#-------------------------------------------------
#
# Project created by QtCreator 2016-03-14T16:43:26
#
#-------------------------------------------------

QT       += core gui
QT += webenginewidgets

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = webenginesettingstest
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp

HEADERS  += mainwindow.h

FORMS    += mainwindow.ui

RESOURCES += \
    js/js.qrc \
    data/data.qrc \
    html/html.qrc \
    images/images.qrc

DISTFILES += \
    index.html

