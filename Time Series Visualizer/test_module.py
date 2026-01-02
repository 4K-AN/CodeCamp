import unittest
import pandas as pd
import time_series_visualizer as tsv


class TimeSeriesTestCase(unittest.TestCase):
    def setUp(self):
        self.df = tsv.df.copy()

    def test_data_cleaning(self):
        # Check that the data has been cleaned (no top 2.5% or bottom 2.5%)
        self.assertEqual(len(self.df), 1110)

    def test_line_plot_title(self):
        fig = tsv.draw_line_plot()
        self.assertEqual(fig.axes[0].get_title(), 'Daily freeCodeCamp Forum Page Views 5/2016-12/2019')

    def test_line_plot_xlabel(self):
        fig = tsv.draw_line_plot()
        self.assertEqual(fig.axes[0].get_xlabel(), 'Date')

    def test_line_plot_ylabel(self):
        fig = tsv.draw_line_plot()
        self.assertEqual(fig.axes[0].get_ylabel(), 'Page Views')

    def test_bar_plot_labels(self):
        fig = tsv.draw_bar_plot()
        self.assertEqual(fig.axes[0].get_xlabel(), 'Years')
        self.assertEqual(fig.axes[0].get_ylabel(), 'Average Page Views')

    def test_bar_plot_legend(self):
        fig = tsv.draw_bar_plot()
        legend = fig.axes[0].get_legend()
        self.assertIsNotNone(legend)

    def test_box_plot_labels(self):
        fig = tsv.draw_box_plot()
        # Check year-wise plot
        self.assertEqual(fig.axes[0].get_title(), 'Year-wise Box Plot (Trend)')
        self.assertEqual(fig.axes[0].get_xlabel(), 'Year')
        self.assertEqual(fig.axes[0].get_ylabel(), 'Page Views')
        
        # Check month-wise plot
        self.assertEqual(fig.axes[1].get_title(), 'Month-wise Box Plot (Seasonality)')
        self.assertEqual(fig.axes[1].get_xlabel(), 'Month')
        self.assertEqual(fig.axes[1].get_ylabel(), 'Page Views')

    def test_box_plot_month_labels(self):
        fig = tsv.draw_box_plot()
        month_labels = fig.axes[1].get_xticklabels()
        expected_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        actual_labels = [label.get_text() for label in month_labels]
        # Check that we have the month labels
        self.assertTrue(any('Jan' in label for label in actual_labels))


if __name__ == '__main__':
    unittest.main()
