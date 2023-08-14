"""empty message

Revision ID: 0d3b6021b7f8
Revises: 362163de1718
Create Date: 2023-08-14 10:00:37.286560

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d3b6021b7f8'
down_revision = '362163de1718'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.alter_column('total_amount',
               existing_type=sa.REAL(),
               type_=sa.Numeric(precision=10, scale=2),
               existing_nullable=True)

    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.REAL(),
               type_=sa.Numeric(precision=10, scale=2),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('price',
               existing_type=sa.Numeric(precision=10, scale=2),
               type_=sa.REAL(),
               existing_nullable=True)

    with op.batch_alter_table('orders', schema=None) as batch_op:
        batch_op.alter_column('total_amount',
               existing_type=sa.Numeric(precision=10, scale=2),
               type_=sa.REAL(),
               existing_nullable=True)

    # ### end Alembic commands ###
