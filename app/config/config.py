import os
from dotenv import load_dotenv

load_dotenv()  # load environment variables from .env if it exists.


class Config(object):
    """Base Config Object"""

    DEBUG = False
    SECRET_KEY = os.environ.get("SECRET_KEY", "Som3$ec5etK*y")
    UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "").replace(
        "postgres://", "postgresql://"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # This is just here to suppress a warning from SQLAlchemy as it will soon be removed
    # RESTX_ERROR_404_HELP = os.environ.get('RESTX_ERROR_404_HELP') #Not working for some reason
    RESTX_ERROR_404_HELP=False
