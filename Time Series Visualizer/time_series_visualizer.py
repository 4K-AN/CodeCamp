import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Import the data and set the index to the date column
df = pd.read_csv(os.path.join(script_dir, 'fcc-forum-pageviews.csv'))
df['Date'] = pd.to_datetime(df['Date'])
df.set_index('Date', inplace=True)

# Clean the data by filtering out the top 2.5% and bottom 2.5%
df = df[(df['Page Views'] >= df['Page Views'].quantile(0.025)) & 
        (df['Page Views'] <= df['Page Views'].quantile(0.975))]


def draw_line_plot():
    # Create a copy of the data for the line plot
    df_line = df.copy()
    
    # Create the figure and axis
    fig, ax = plt.subplots(figsize=(12, 6))
    
    # Plot the line
    ax.plot(df_line.index, df_line['Page Views'], linewidth=1, color='#1f77b4')
    
    # Set labels and title
    ax.set_title('Daily freeCodeCamp Forum Page Views 5/2016-12/2019', fontsize=16)
    ax.set_xlabel('Date', fontsize=12)
    ax.set_ylabel('Page Views', fontsize=12)
    
    # Format the layout
    fig.tight_layout()
    
    # Save the figure
    fig.savefig(os.path.join(script_dir, 'line_plot.png'))
    
    return fig


def draw_bar_plot():
    # Create a copy of the data for the bar plot
    df_bar = df.copy()
    
    # Extract year and month
    df_bar['Year'] = df_bar.index.year
    df_bar['Month'] = df_bar.index.month
    
    # Calculate average page views for each month grouped by year
    df_bar_grouped = df_bar.groupby(['Year', 'Month'])['Page Views'].mean().unstack()
    
    # Create the figure and axis
    fig, ax = plt.subplots(figsize=(10, 6))
    
    # Create the bar plot
    df_bar_grouped.plot(kind='bar', ax=ax, width=0.8)
    
    # Set labels and title
    ax.set_title('Average Page Views by Month and Year')
    ax.set_xlabel('Years', fontsize=12)
    ax.set_ylabel('Average Page Views', fontsize=12)
    
    # Create month labels
    month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    ax.legend(title='Months', labels=month_labels, bbox_to_anchor=(1.05, 1), loc='upper left')
    
    # Format x-axis
    years = df_bar['Year'].unique()
    ax.set_xticklabels([str(year) for year in sorted(years)], rotation=45)
    
    # Format the layout
    fig.tight_layout()
    
    # Save the figure
    fig.savefig(os.path.join(script_dir, 'bar_plot.png'))
    
    return fig


def draw_box_plot():
    # Create a copy of the data for the box plots
    df_box = df.copy()
    
    # Extract year and month
    df_box['Year'] = df_box.index.year
    df_box['Month'] = df_box.index.month
    
    # Create figure with two subplots
    fig, axes = plt.subplots(1, 2, figsize=(15, 5))
    
    # Year-wise Box Plot
    sns.boxplot(data=df_box, x='Year', y='Page Views', ax=axes[0])
    axes[0].set_title('Year-wise Box Plot (Trend)', fontsize=14)
    axes[0].set_xlabel('Year', fontsize=12)
    axes[0].set_ylabel('Page Views', fontsize=12)
    
    # Month-wise Box Plot
    month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    sns.boxplot(data=df_box, x='Month', y='Page Views', ax=axes[1])
    axes[1].set_title('Month-wise Box Plot (Seasonality)', fontsize=14)
    axes[1].set_xlabel('Month', fontsize=12)
    axes[1].set_ylabel('Page Views', fontsize=12)
    axes[1].set_xticks(range(12))
    axes[1].set_xticklabels(month_labels)
    
    # Format the layout
    fig.tight_layout()
    
    # Save the figure
    fig.savefig(os.path.join(script_dir, 'box_plot.png'))
    
    return fig


# Call the functions to generate the visualizations
if __name__ == '__main__':
    draw_line_plot()
    draw_bar_plot()
    draw_box_plot()
    plt.close('all')
