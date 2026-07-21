# ==============================================================================
# THE ULTIMATE PYTHON INTERPOLATION MASTER REFERENCE
# NumPy + SciPy + Pandas | 1D, 2D, Grid, & Scattered Data
# ==============================================================================
# Installation Prerequisites:
# pip install numpy scipy pandas matplotlib

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.interpolate import (
    Akima1DInterpolator,
    CubicSpline,
    RegularGridInterpolator,
    Rbf,  # Added: Modern approach for smooth scattered data
    griddata,
)

# Set random seed for reproducibility across 2D examples
np.random.seed(42)


# ==============================================================================
# MODULE 1: 1D LINEAR INTERPOLATION & BOUNDARY EXTRA POLATION (NUMPY)
# Use Case: Fast, light-weight estimation where straight lines between points suffice.
# ==============================================================================
print("--- Running Module 1: 1D Linear Interpolation ---")

x_known = np.array([0, 1, 2, 4, 5])
y_known = np.array([1, 3, 2, 5, 4])

# Generate a dense grid of points to estimate values between 0 and 5
x_target = np.linspace(0, 5, 100)
y_linear = np.interp(x_target, x_known, y_known)

# Extrapolation: Explicitly handle queries outside known boundaries (x < 0 or x > 5)
# left=1.0 forces any x < 0 to output 1.0; right=4.0 forces x > 5 to output 4.0
x_outside = np.array([-1.0, 2.5, 6.0])
y_extrap = np.interp(x_outside, x_known, y_known, left=1.0, right=4.0)
print(f"Extrapolation check for [-1, 2.5, 6]: {y_extrap}\n")


# ==============================================================================
# MODULE 2: SPLINE INTERPOLATION (SMOOTH CURVES & OVERSHOOT CONTROL)
# Use Case: Physics engines, animations, and smooth scientific data plotting.
# ==============================================================================
print("--- Running Module 2: Spline Interpolation ---")

# Define a jagged wave shape
x_wave = np.array([0, 1, 2, 3, 4])
y_wave = np.array([0, 1, 0, -1, 0])
x_wave_dense = np.linspace(0, 4, 200)

# A. Cubic Spline: Continuous 1st & 2nd derivatives. Beautifully smooth,
# but prone to "ringing" or overshooting if the data contains sudden jumps.
cs = CubicSpline(x_wave, y_wave, bc_type="natural")
y_cs = cs(x_wave_dense)

# B. Akima Spline: Uses local sub-splines. Dramatically resists wild overshoots;
# highly stable for real-world telemetry data with abrupt spikes.
akima = Akima1DInterpolator(x_wave, y_wave)
y_akima = akima(x_wave_dense)


# ==============================================================================
# MODULE 3: PANDAS TIME-SERIES INTERPOLATION (MISSING DATA / DATA CLEANING)
# Use Case: Imputing missing data (NaNs) in financial, IoT, or weather time-series.
# ==============================================================================
print("--- Running Module 3: Pandas Time-Series Interpolation ---")

# Setup simulated temporal data with a missing pocket of records
dates = pd.date_range("2026-01-01", periods=5)
df = pd.DataFrame({"Temperature": [15.2, np.nan, np.nan, 17.1, 16.5]}, index=dates)

# Method A: Pure Index Linear (Treats gaps as evenly spaced steps)
df_linear = df.interpolate(method="linear")

# Method B: Time-Aware (Calculates exact intervals mathematically based on timestamps)
df_time = df.interpolate(method="time")

# Method C: Polynomial (Fits a curve across the gap; requires an order argument)
df_poly = df.interpolate(method="polynomial", order=2)

print("Original Missing Data:\n", df)
print("\nTime-Aware Imputation:\n", df_time, "\n")


# ==============================================================================
# MODULE 4: 2D REGULAR GRID INTERPOLATION (STRUCTURED DATA)
# Use Case: GIS mapping, spatial weather maps, and image resizing.
# ==============================================================================
print("--- Running Module 4: 2D Regular Grid Interpolation ---")

x_grid = np.linspace(0, 10, 5)
y_grid = np.linspace(0, 10, 5)

# Build a uniform grid coordinate system
X, Y = np.meshgrid(x_grid, y_grid, indexing="ij")
Z_data = np.sin(X / 2) + np.cos(Y / 2)

# Set up a fast grid interpolator (Options: 'linear', 'nearest', 'slinear', 'cubic')
interp_2d = RegularGridInterpolator((x_grid, y_grid), Z_data, method="cubic")

# Query a precise custom coordinate inside the grid system
query_point = np.array([[2.3, 5.7]])
print(f"Estimated value at Grid Point (2.3, 5.7): {interp_2d(query_point)[0]:.4f}\n")


# ==============================================================================
# MODULE 5: SCATTERED DATA INTERPOLATION (GRIDDATA & CATEGORICAL EXTENSION)
# Use Case: Mapping unorganized readings (e.g., random rainfall stations, mining drills).
# ==============================================================================
print("--- Running Module 5: Scattered Data Interpolation ---")

# 100 randomly scattered data measurements across a 10x10 space
points = np.random.rand(100, 2) * 10
values = np.sin(points[:, 0]) * np.cos(points[:, 1])

# Create the clean, uniform grid matrix we want to map our messy points onto
grid_x, grid_y = np.mgrid[0:10:100j, 0:10:100j]

# Method A: Cubic griddata (Creates a beautiful, smooth continuous surface)
grid_z_cubic = griddata(points, values, (grid_x, grid_y), method="cubic")

# Added: Method B: Nearest Neighbor griddata (Crucial real-world fallback!)
# Used for categorical data (soil types, zoning laws) where blending values is illegal.
grid_z_nearest = griddata(points, values, (grid_x, grid_y), method="nearest")


# ==============================================================================
# ADDED MODULE 6: RADIAL BASIS FUNCTIONS (RBF) FOR MULTI-DIMENSIONAL DATA
# Use Case: Superior alternative to griddata. Smoothly interpolates messy scattered
# data across 2D, 3D, or higher dimensions without creating grid matrix constraints.
# ==============================================================================
print("--- Running Module 6: Radial Basis Functions (RBF) ---")

# Build the RBF system directly from our scattered points
# 'thin_plate' or 'multiquadric' functions yield excellent structural surfaces
rbf_interpolator = Rbf(points[:, 0], points[:, 1], values, function="thin_plate")

# Query directly via arbitrary matrices or points without matching dimensions!
grid_z_rbf = rbf_interpolator(grid_x, grid_y)
print("RBF multi-dimensional surface built successfully.\n")


# ==============================================================================
# MODULE 7: VISUALIZATION MATRIX (MATPLOTLIB)
# ==============================================================================
print("Generating visualization dashboard plots...")

fig, axs = plt.subplots(2, 2, figsize=(12, 10))

# Plot 1: 1D Linear vs Boundary Handling
axs[0, 0].plot(x_known, y_known, "ro", markersize=8, label="Known Samples")
axs[0, 0].plot(x_target, y_linear, "b-", label="Linear Interp")
axs[0, 0].set_title("1D Linear Estimation")
axs[0, 0].legend()
axs[0, 0].grid(True)

# Plot 2: Spline Shootout (Cubic vs Akima)
axs[0, 1].plot(x_wave, y_wave, "ko", markersize=8, label="Raw Spikes")
axs[0, 1].plot(x_wave_dense, y_cs, "r--", label="Cubic Spline (Overshoots)")
axs[0, 1].plot(x_wave_dense, y_akima, "g-", label="Akima Spline (Stable)")
axs[0, 1].set_title("Spline Comparison (Overshoot Control)")
axs[0, 1].legend()
axs[0, 1].grid(True)

# Plot 3: Scattered Data Interpolated via Cubic Griddata
im1 = axs[1, 0].imshow(
    grid_z_cubic.T, extent=(0, 10, 0, 10), origin="lower", cmap="viridis"
)
axs[1, 0].scatter(
    points[:, 0], points[:, 1], c="white", s=10, edgecolor="black", label="Sensors"
)
axs[1, 0].set_title("Scattered Data (Cubic Griddata)")
fig.colorbar(im1, ax=axs[1, 0])

# Plot 4: Scattered Data Interpolated via Advanced RBF Surface
im2 = axs[1, 1].imshow(
    grid_z_rbf.T, extent=(0, 10, 0, 10), origin="lower", cmap="plasma"
)
axs[1, 1].set_title("Advanced Radial Basis Function (RBF)")
fig.colorbar(im2, ax=axs[1, 1])

plt.tight_layout()
print("All systems completed. Displaying dashboard.")
plt.show()


# ==================================================================================================================
#                      PYTHON INTERPOLATION REFERENCE MATRIX
# ==================================================================================================================
# Function / Tool            | Best Applied To               | Why It Matters in Production
# ---------------------------+-------------------------------+------------------------------------------------------
# np.interp                  | Game engines, microcontrollers| Light, blazing fast, but strictly limited to 1D
#                            | embedded hardware             | straight lines between data points.
# ---------------------------+-------------------------------+------------------------------------------------------
# CubicSpline                | Engineering CAD design,       | Beautifully smooth continuous curves, but dangerous
#                            | physical trajectories         | and unstable near sudden data spikes.
# ---------------------------+-------------------------------+------------------------------------------------------
# Akima1DInterpolator        | Economic trends, sensor feeds | Keeps its composure and strictly refuses to overshoot
#                            | robotics telemetry            | or ring when meeting wild data spikes.
# ---------------------------+-------------------------------+------------------------------------------------------
# df.interpolate             | Financial ledgers, IoT logs   | Built-in pandas tool vital for cleanly filling broken
#                            | climate time-series data      | or missing timeline index entries (NaNs).
# ---------------------------+-------------------------------+------------------------------------------------------
# RegularGridInterpolator    | Medical MRI scans, satellite  | Extremely high performance; engineered for rapid
#                            | thermal fields, 3D assets     | evaluation of uniform multidimensional matrix slices.
# ---------------------------+-------------------------------+------------------------------------------------------
# griddata (method='nearest')| Geospatial zoning, pixel art  | Preserves sharp categorical breaks and boundaries
#                            | digital terrain borders       | without blending values illegally (e.g., land vs water).
# ---------------------------+-------------------------------+---------------------------------------------------------
# Rbf (Radial Basis Function)| Machine Learning features,    | Highly flexible; easily calculates custom spatial
#                            | unorganized 3D topography     | vectors across any dimensional layout without grid rules.
# ---------------------------+-------------------------------+----------------------------------------------------------
