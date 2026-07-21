from fastapi import FastAPI, Request, status, Form, Depends
from fastapi.responses import (
    HTMLResponse,
    RedirectResponse,
)
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

# Import our database configuration layer
import database

app = FastAPI()

# Create the database file (shop.db) and tables automatically on startup
database.init_db()

# Mount your static assets directory for style.css
app.mount("/static", StaticFiles(directory="static"), name="static")

# Instantiate the Jinja2 template rendering workspace
templates = Jinja2Templates(directory="templates")


# Dependency tool to safely open/close a database connection session for each request
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- FRONTEND ROUTING ENDPOINTS (GET REQUESTS) ---


@app.get("/", response_class=HTMLResponse)
def read_home(request: Request, db: Session = Depends(get_db)):
    # Fetch ALL products stored inside our SQLite database table rows
    products = db.query(database.Product).all()

    # Package and send the live products dataset straight to index.html
    return templates.TemplateResponse(
        request=request, name="index.html", context={"products": products}
    )


# CRITICAL ORDER: The specific static layout route MUST sit above the dynamic ID route
@app.get("/products/upload", response_class=HTMLResponse)
def upload_page(request: Request):
    return templates.TemplateResponse(request=request, name="upload.html", context={})


# Dynamic route capturing numerical IDs from the browser address bar pattern
@app.get("/products/{product_id}", response_class=HTMLResponse)
def product_detail(product_id: int, request: Request, db: Session = Depends(get_db)):
    # Fetch a single specific product record row matching the clicked ID
    product = (
        db.query(database.Product).filter(database.Product.id == product_id).first()
    )
    return templates.TemplateResponse(
        request=request, name="product.html", context={"product": product}
    )


@app.get("/auth/login", response_class=HTMLResponse)
def login_page(request: Request):
    return templates.TemplateResponse(request=request, name="login.html", context={})


@app.get("/auth/register", response_class=HTMLResponse)
def register_page(request: Request):
    return templates.TemplateResponse(request=request, name="register.html", context={})


# --- LIVE DATA PROCESSORS (POST REQUESTS) ---


@app.post("/products/upload")
def handle_upload(
    title: str = Form(...),
    price: float = Form(...),
    description: str = Form(...),
    db: Session = Depends(get_db),
):
    # Standard placeholder image path utilized until local image uploading disk storage is built
    placeholder_image = (
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    )

    # 1. Instantiate our structural table row class with incoming data payloads
    new_product = database.Product(
        title=title, price=price, description=description, image_url=placeholder_image
    )

    # 2. Stage, permanently commit, and refresh the newly assigned tracking ID keys
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    # 3. Clean 303 browser redirect back to homepage to display updated layout
    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)


@app.post("/products/{product_id}/buy")
def handle_buy(product_id: int, db: Session = Depends(get_db)):
    # Find the target object entry row inside our table matching the parameter
    product = (
        db.query(database.Product).filter(database.Product.id == product_id).first()
    )

    if product:
        # Simulate an instant sale transaction by purging the item from active marketplace views
        db.delete(product)
        db.commit()
        print(f"Product ID {product_id} successfully bought and cleared!")

    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)


@app.post("/products/{product_id}/delete")
def handle_delete(product_id: int, db: Session = Depends(get_db)):
    # Find the target object entry row inside our table matching the parameter
    product = (
        db.query(database.Product)
        .filter(database.Product.id == database.Product.id)
        .first()
    )

    if product:
        # Erase the selected data listing out of our SQLite storage engine permanently
        db.delete(product)
        db.commit()
        print(
            f"Product ID {product_id} permanently deleted by administrative post trigger."
        )

    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)
